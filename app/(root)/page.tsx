import React from 'react';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {dummyInterviews} from "@/constants";
import InterviewCard from "@/components/InterviewCard";
import {getCurrentUser} from "@/lib/actions/auth.action";

export default async function Page() {
    const user = await getCurrentUser(); // ✅ await the promise

    console.log("Current User:", user); // optional for debug

    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                    <p className='text-lg'>
                        Practice on real interview questions & get instant feedback
                    </p>
                    <Button asChild className='btn-primary max-sm:w-full'>
                        <Link href='/interview'> Start an Interview</Link>
                    </Button>
                </div>
                <Image
                    src='/robot.png'
                    alt='robot-dude'
                    width={400}
                    height={400}
                    className='max-sm:hidden'
                />
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>
                <div className='interviews-section'>
                    {dummyInterviews.map((interview) => (
                        <InterviewCard key={interview.id} {...interview} />
                    ))}
                    {/* <p>You haven&apos;t taken any interviews</p> */}
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an Interview</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview) => (
                        <InterviewCard key={interview.id} {...interview} />
                    ))}
                    {/* <p>There are no interview available</p> */}
                </div>
            </section>
        </>
    );
}
