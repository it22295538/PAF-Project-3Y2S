import React from "react";

const AboutUs = () => {
  return (
    <div
      className="w-full h-screen bg-cover bg-center text-white flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url('/aboutus.jpg')`,
      }}
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-xl max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to LevelUp</h1>
        <p className="text-lg">
        LevelUp is a collaborative learning platform that connects people who want to share their expertise with those eager to learn new skills. Whether you're an expert in coding, design, cooking, or photography, you can create and offer lessons while discovering new topics to explore yourself. The app fosters a community-driven environment where users can teach, learn, and grow together through interactive sessions, flexible learning paths, and real-time collaboration — making skill development accessible, engaging, and empowering for everyone.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
