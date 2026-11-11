const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const ts = require("typescript");
const path = require("node:path");
const Module = require("node:module");

// Execute the route itself, replacing only its external network boundary.
function loadTs(filename) {
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = module.paths;
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const original = mod.require.bind(mod);
  mod.require = (name) =>
    name.endsWith("/validateEmail")
      ? loadTs(path.resolve(path.dirname(filename), name + ".ts"))
      : original(name);
  mod._compile(source, filename);
  return mod.exports;
}
const { POST } = loadTs(path.resolve("app/api/waitlist/route.ts"));
const request = (body, origin = "https://numbeast-coming-soon.vercel.app") =>
  new Request("https://numbeast-coming-soon.vercel.app/api/waitlist", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

test("invalid email, cross-origin traffic and bots never reach the signup provider", async () => {
  const saved = global.fetch;
  let calls = 0;
  global.fetch = async () => {
    calls++;
    throw Error("Should not submit");
  };
  try {
    assert.equal((await POST(request({ email: "not-an-email" }))).status, 400);
    assert.equal(
      (
        await POST(
          request({ email: "parent@example.com" }, "https://elsewhere.example"),
        )
      ).status,
      403,
    );
    assert.equal(
      (await POST(request({ email: "parent@example.com", website: "bot" })))
        .status,
      200,
    );
    assert.equal(calls, 0);
  } finally {
    global.fetch = saved;
  }
});
test("a valid signup uses the existing form field and waits for provider confirmation", async () => {
  const saved = global.fetch;
  let destination, entry;
  global.fetch = async (url, options) => {
    destination = url;
    entry = options.body.get("entry.632745447");
    return new Response("", { status: 200 });
  };
  try {
    const response = await POST(request({ email: " parent@example.com " }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.match(destination, /google.com\/forms/);
    assert.equal(entry, "parent@example.com");
  } finally {
    global.fetch = saved;
  }
});
test("provider failures remain failures so the browser can offer retry", async () => {
  const saved = global.fetch;
  global.fetch = async () => new Response("", { status: 503 });
  try {
    assert.equal(
      (await POST(request({ email: "parent@example.com" }))).status,
      502,
    );
  } finally {
    global.fetch = saved;
  }
});
