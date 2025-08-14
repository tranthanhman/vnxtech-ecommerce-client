"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuthStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";


const formSchema = z.object({
    name: z.string(),
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    phoneNumber: z.string(),
    dob: z.union([z.date(), z.string()]),
    gender: z.string().optional(),
})

export default function ProfileForm() {
    const { user } = useAuthStore()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
            dob: user?.dob || "",
            gender: user?.gender || ""
        },
    })

    const onSubmit = () => {
        console.log('first');
    }

    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                dob: user.dob || "",
                gender: user.gender || "",
            });
        }
    }, [user, form]);

    return (
        <div className="space-y-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Họ tên</FormLabel>
                                <FormControl>
                                    <Input placeholder="Anh Mẫn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                    <Input type="tel" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ngày sinh</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        {...field}
                                        value={
                                            field.value
                                                ? typeof field.value === "string"
                                                    ? field.value
                                                    : field.value instanceof Date
                                                        ? field.value.toISOString().split("T")[0]
                                                        : ""
                                                : ""
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={() => (
                            <FormItem>
                                <FormLabel>Giới tính</FormLabel>
                                <FormControl>
                                    <RadioGroup defaultValue="option-one">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="male" id="option-one" />
                                            <Label htmlFor="option-one">male</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="female" id="option-two" />
                                            <Label htmlFor="option-two">Female</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="other" id="option-two" />
                                            <Label htmlFor="option-two">Other</Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            <Button className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2">Cập nhật</Button>
        </div>
    )
}