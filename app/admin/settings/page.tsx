export const metadata = { title: "Settings | Admin" };

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-ui text-text-primary">Settings</h1>
        <p className="text-text-secondary font-ui text-sm mt-0.5">Site configuration</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-border p-6 space-y-6">
        <div>
          <h3 className="text-base font-bold font-ui text-text-primary mb-4">Site Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Site Name", value: "AI മലയാളം", type: "text" },
              { label: "Tagline (Malayalam)", value: "ടെക് & AI വാർത്തകൾ", type: "text" },
              { label: "Admin Email", value: process.env.ADMIN_EMAIL || "admin@techkerala.com", type: "email" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs font-semibold font-ui text-text-secondary mb-1">{field.label}</label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full px-4 py-2.5 border border-gray-border rounded-xl text-sm font-ui focus:outline-none focus:border-primary"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-border">
          <h3 className="text-base font-bold font-ui text-text-primary mb-3">API Access</h3>
          <p className="text-sm font-ui text-text-secondary mb-3">Use these endpoints to push articles programmatically:</p>
          <div className="bg-gray-light rounded-xl p-4 space-y-2 font-mono text-xs text-text-secondary">
            <p>POST /api/articles — Create article</p>
            <p>PUT /api/articles/[slug] — Update article</p>
            <p>DELETE /api/articles/[slug] — Delete article</p>
            <p>GET /api/articles?category=ai-news&status=published</p>
          </div>
        </div>

        <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-ui font-semibold hover:bg-primary-dark transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}
