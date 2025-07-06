import SignIn from "./sign-in";
import SignUp from "./sign-up";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const AuthTabs = () => {
  return (
    <Tabs defaultValue="sign-in" className="w-[400px]">
      <Card className="gap-3">
        <CardHeader className=" flex items-center">
          <TabsList className="">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="">
          <TabsContent value="sign-in">
            <SignIn />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUp />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default AuthTabs;
