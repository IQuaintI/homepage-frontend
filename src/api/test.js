const testFetch = async () => {
    try {
      const res = await fetch("/api/test");
      const data = await res.json();
      console.log("✅ Test fetch got data:", data);
    } catch (err) {
      console.error("❌ Fetch failed:", err);
    }
  };
  
  testFetch(); // <-- You MUST trigger a fetch somehow!
  