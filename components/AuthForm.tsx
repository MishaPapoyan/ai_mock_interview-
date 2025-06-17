"use client";

import {z} from "zod";
import Link from "next/link";
import Image from "next/image";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";

import {createUserWithEmailAndPassword, signInWithEmailAndPassword,} from "firebase/auth";

import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";

import {signIn, signUp} from "@/lib/actions/auth.action";
import FormField from "./FormField";
import {auth} from "@/firebase/client";


const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3)
    })
}

function AuthForm({type}: { type: FormType }) {
    const formSchema = authFormSchema(type)
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                const {name, email, password} = values
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    password,
                    email: ""
                })
                if (!result?.success) {
                    toast.error("Error creating account")
                    return
                }
                toast.success("Account created successfully. Please sign in.");
                router.push("/sign-in");
            } else {
                const {email, password} = values
                const userCredentials = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredentials.user.getIdToken();
                if (!idToken) {
                    toast.error("Error creating account", error.message)
                    return;
                }
                await signIn({
                    email, idToken
                })
                toast.success("sign in successfully.")
                router.push("/")
            }
        } catch (error) {
            console.error(error)
            toast.error(`there was an error: ${error}`)
        }
    }

    const isSignIn = type === 'sign-in'

    return (
        <div className="card-border lg:min-w[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className='flex flex-row gap-2 justify-center'>
                    <Image src='/logo.svg' alt='logi' height={32} width={38}/>
                    <h2 className='text-primary-100'>PrepWise</h2>
                </div>


                <h3>Practice job interview with AI</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form ">
                        {!isSignIn &&
                            <FormField
                                control={form.control}
                                name='name'
                                label='Name'
                                placeholder='Your Name'
                            />
                        }

                        <FormField
                            control={form.control}
                            name='email'
                            label='Email'
                            placeholder='Your Email Address'
                            type="email"
                        />


                        <FormField
                            control={form.control}
                            name='password'
                            label='password'
                            placeholder='Your password'
                            type="password"
                        />

                        <Button type="submit" className='btn'>{isSignIn ? 'Sign in' : 'Sign Up'}</Button>
                    </form>
                </Form>
                <p className='text-center'>
                    {isSignIn ? "No account yet? " : 'Have an account already? '}
                    <Link href={!isSignIn ? '/sign-in' : '/sign-up'}>
                        {!isSignIn ? 'Sign up' : 'Sign Up'}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm


// https://www.youtube.com/watch?v=8GK8R77Bd7g&t=13820s (45:00)