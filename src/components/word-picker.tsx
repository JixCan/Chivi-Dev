"use client"


import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label"




import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const textFormSchema = z.object({
    word: z.string().min(1).max(4),
})

const listFormSchema = z.object({
    list: z
        .string({
            required_error: "Please select a list to display.",
        }),
})

export default function Picker() {
    // 1. Define your form.
    const textForm = useForm<z.infer<typeof textFormSchema>>({
        resolver: zodResolver(textFormSchema),
        defaultValues: {
            word: "",
        },
    })

    const listForm = useForm<z.infer<typeof listFormSchema>>({
        resolver: zodResolver(listFormSchema),
    })

    // 2. Define a submit handler.
    function onTextSubmit(data: z.infer<typeof textFormSchema>) {
        console.log(JSON.stringify(data, null, 2))
    }

    function onListSubmit(data: z.infer<typeof listFormSchema>) {
        console.log(JSON.stringify(data, null, 2))
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <Label>Type a word in Hanzi to check it's definition:</Label>
                    <Form {...textForm}>
                        <form onSubmit={textForm.handleSubmit(onTextSubmit)} className="space-y-8">
                            <FormField
                                control={textForm.control}
                                name="word"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Word</FormLabel>
                                        <FormControl>
                                            <Input placeholder="我" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is what you want to find.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>

                    <Label>OR Choose a random word from HSK lists:</Label>

                    <Form {...listForm}>
                        <form onSubmit={listForm.handleSubmit(onListSubmit)} className="w-2/3 space-y-6">
                            <FormField
                                control={listForm.control}
                                name="list"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a list to display" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">HSK 1</SelectItem>
                                                <SelectItem value="2">HSK 2</SelectItem>
                                                <SelectItem value="3">HSK 3</SelectItem>
                                                <SelectItem value="4">HSK 4</SelectItem>
                                                <SelectItem value="5">HSK 5</SelectItem>
                                                <SelectItem value="6">HSK 6</SelectItem>
                                                <SelectItem value="7">HSK 7</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>

                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

        </div>
    )
}

