"use client"
import React from 'react';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import DashboardHero from '@/app/components/Admin/DashboardHero';
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import CourseAnalytics from '@/app/components/Admin/Analytics/CourseAnalytics';

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="ELearning - Admin"
                    description="ELearning is a platform for students to learn and get help from teachers"
                    keywords="Programming, MERN, Redux, Machine Learning"
                />
                <div className="flex h-screen">
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar />
                    </div>
                    <div className="w-[85%]">
                        <DashboardHero />
                        <CourseAnalytics />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}

export default page;