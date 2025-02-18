import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Typography } from "@/components/ui/typography";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  roastPreference: z.enum(["light", "medium", "dark", "any"]),
  caffeinePreference: z.enum(["regular", "decaf", "any"]),
  intensity: z.number().min(1).max(10),
});

interface PreferenceFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export function PreferenceForm({ onSubmit }: PreferenceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roastPreference: "any",
      caffeinePreference: "any",
      intensity: 5,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="roastPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Typography.H4>Roast Preference</Typography.H4>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="light" />
                    </FormControl>
                    <FormLabel className="font-normal">Light Roast</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="medium" />
                    </FormControl>
                    <FormLabel className="font-normal">Medium Roast</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dark" />
                    </FormControl>
                    <FormLabel className="font-normal">Dark Roast</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="any" />
                    </FormControl>
                    <FormLabel className="font-normal">No Preference</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="intensity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Typography.H4>Intensity Level</Typography.H4>
              </FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[field.value]}
                  onValueChange={(vals) => field.onChange(vals[0])}
                  className="py-4"
                />
              </FormControl>
              <div className="flex justify-between">
                <Typography.Small>Mild</Typography.Small>
                <Typography.Small>Strong</Typography.Small>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Get Recommendations
        </Button>
      </form>
    </Form>
  );
}