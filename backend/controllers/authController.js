import User from "../models/User.js";



//REGISTRATION OF A STUDENT STEP 1:REGISTER USER AND SEND OTP
export async function registerUser(req, res) {
  try {
    const { name, email, phone, password,} = req.body;
    if(!email) return res.status(400).json({
      message: "Email is required"
    });

    const cleanPhone = phone ?phone.toString().replace(/\D/g, "") : "";
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ 
        message: "Mobile number must be exactly 10 digits"
      });
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }








export async function updateProfile(req, res) {
  try {
    const { name, email, phone, department, stream, semester, academicYear, rollNumber } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email) {
      const normalizedEmail = email.trim().toLowerCase();
      if (normalizedEmail !== user.email.toLowerCase()) {
        if (user.role === "user") {
          return res.status(400).json({ message: "Students are not allowed to change their email address" });
        }
        if (await User.findOne({ email: normalizedEmail, _id: { $ne: user._id } })) {
          return res.status(400).json({ message: "Email already in use" });
        }
        user.email = normalizedEmail;
      }
    }
    if (phone) {
      const cleanPhone = phone.toString().replace(/\D/g, "");
      if (cleanPhone.length !== 10) {
        return res.status(400).json({ message: "Mobile number must be exactly 10 digits" });
      }
      user.phone = cleanPhone;
    }

    if (name) user.name = name;
    if (department) user.department = department;
    if (stream) user.stream = stream;
    if (semester) user.semester = semester;
    if (academicYear) user.year = academicYear;
    if (rollNumber) user.rollNo = rollNumber;

    await user.save();
    res.status(200).json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
}

catch (error) {
