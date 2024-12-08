//ติดต่อฐานข้อมูล ดำเนินการกับฐานข้อมูล
const slugify = require("slugify")
const Blogs = require("../models/blogs")
const { v4: uuidv4 } = require('uuid');
//บันทึกข้อมูล
exports.create = async (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title, { lower: true, strict: true });

  if(!slug)slug=uuidv4();

  // Validate
  if (!title) return res.status(400).json({ error: "กรุณาป้อนชื่อบทความ" });
  if (!content) return res.status(400).json({ error: "กรุณาป้อนเนื้อหาบทความ" });

  //บันทึกข้อมูล
  try {
      const blog = await Blogs.create({ title, content, author, slug });
      res.json(blog);
  } catch (err) {
      res.status(400).json({ error:"มีชื่อซ้ำกัน"});
  }
};

//ดึงข้อมูลทั้งหมด
exports.getAllblogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({});
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "ไม่พบข้อมูลหรือมีข้อผิดพลาด: " + err.message });
  }
};

//ดึงข้อมูลตามสนใจ
exports.singleBlog = async (req, res) => {
  const { slug } = req.params;
  try {
    // ใช้ findOne เพื่อค้นหา blog ด้วย slug
    const blog = await Blogs.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ error: "ไม่พบบทความ" });
    }
    // ส่งข้อมูล blog กลับไป
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการดึงข้อมูล" });
  }
};

exports.remove = async (req, res)=>{
  const {slug} = req.params
  try {
    const blog = await Blogs.findOneAndDelete({slug});
    if(!blog) {
      return res.status(404).json({ error: "ไม่พบบทความ" })
    }
    res.json({
      message:"ลบบทความเรียบร้อย"
    })
  } catch (err) {
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการลบข้อมูล", details: err.message });
  }
}

exports.update = async (req, res) => {
  const { slug } = req.params; // ดึง slug จาก URL
  const { title, content, author } = req.body; // รับข้อมูลใหม่จากคำขอ

  try {
    // ค้นหาและอัปเดตบทความตาม slug
    const blog = await Blogs.findOneAndUpdate(
      { slug },{ title, content, author }, // ข้อมูลที่ต้องการอัปเดต
      { new: true, runValidators: true } // คืนค่าที่อัปเดตและตรวจสอบ validation
    );
    if (!blog) {
      return res.status(404).json({ error: "ไม่พบบทความ" });
    }
    // ส่งข้อมูลที่อัปเดตกลับไป
    res.json({
      message: "อัปเดตบทความเรียบร้อย",
      blog,
    });
  } catch (err) {
    // จัดการข้อผิดพลาด
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล", details: err.message });
  }
};