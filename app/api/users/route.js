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
        { message: "Name and email are required" },
        { status: 400 }
      );
    }

    const newUser = new User({ name, email });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
