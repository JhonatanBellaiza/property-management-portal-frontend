import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";


import LoginComponent from "../components/Login";
import ManageRequests from "../components/ManageRequests";

const ManageRequestPage = () => {
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <ManageRequests />
        </div>
      </section>
    </div>
  );
};

export default ManageRequestPage;
