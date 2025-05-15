import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Subscription = () => {
  return (
    <Card className="bg-primary text-primary-foreground flex flex-row p-8">
      <CardHeader className="flex-1 flex flex-col justify-between">
        <CardTitle className="text-2xl">Stay Updated</CardTitle>
        <CardDescription className="text-md text-primary-foreground">Get weekly recommendations and reviews delivered to your inbox.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-center flex-1 gap-4">
        <Input type="email" placeholder="Enter your email" className="w-[300px] h-[50px] bg-primary-foreground text-black" />
        <Button className="bg-primary-foreground text-primary h-[50px] w-[150px] hover:bg-gray-100 text-md">Subscribe</Button>
      </CardContent>
    </Card>
  );
};

export default Subscription;
