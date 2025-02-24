import { Connect } from "@/database/connection";
import User from "@/database/userModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await Connect();
    const users = await User.find(); // Fetch all users
    // console.log(users);
    return NextResponse.json({
      success: true,
      message: "Users retrieved successfully!",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}

export async function POST(request) {
  try {
    await Connect();
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { success: false, status: 400 }
      );
    }

    const newUser = new User({ name, email });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { success: true, status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { success: false, status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await Connect(); // Ensure the database connection is established
    const { _id } = await request.json();
    console.log("_id", _id);

    const userFound = await User.findByIdAndDelete(_id); // Delete the user by ID
    console.log("userFound", userFound);
    if (userFound) {
      return NextResponse.json(
        { message: "User deleted successfully!" },
        { status: 200 }
      ); // Return success message
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 }); // User not found
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
