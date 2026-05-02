const express = require("express");
const router = express.Router();
const supabase = require("../supabase");

// GET all leads (search/filter)
router.get("/", async (req, res) => {
  try {
    const { search, status, source } = req.query;

    let query = supabase.from("leads").select("*");

    if (status) {
      query = query.eq("status", status);
    }

    if (source) {
      query = query.eq("source", source);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
  } catch (err) {
    console.error("GET ERROR FULL:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET stats
router.get("/stats", async (req, res) => {
  try {
    const { data, error } = await supabase.from("leads").select("status, source");

    if (error) return res.status(500).json({ error: error.message });

    const stats = {
      total: data.length,
      interested: data.filter(l => l.status === "Interested").length,
      not_interested: data.filter(l => l.status === "Not Interested").length,
      converted: data.filter(l => l.status === "Converted").length,
      from_call: data.filter(l => l.source === "Call").length,
      from_whatsapp: data.filter(l => l.source === "WhatsApp").length,
      from_field: data.filter(l => l.source === "Field").length,
    };

    res.json(stats);
  } catch (err) {
    console.error("STATS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST new lead
router.post("/", async (req, res) => {
  try {
    const { name, phone, source } = req.body;

    if (!name || !phone || !source) {
      return res.status(400).json({ error: "All fields required" });
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([{ name, phone, source, status: "Interested" }])
      .select();

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json(data[0]);
  } catch (err) {
    console.error("POST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH status update
router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) return res.status(500).json({ error: error.message });
    if (!data.length) return res.status(404).json({ error: "Lead not found" });

    res.json(data[0]);
  } catch (err) {
    console.error("PATCH ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE lead
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("leads").delete().eq("id", id);

    if (error) return res.status(500).json({ error: error.message });

    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
console.log("HIT GET /api/leads");