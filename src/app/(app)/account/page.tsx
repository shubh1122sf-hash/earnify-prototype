
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/app/auth-provider";

export default function AccountPage() {
  const { user, loading } = useAuth();

  if (loading || !user) {
      return (
          <div className="flex flex-col gap-6 max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold">My Account</h1>
              <Card>
                  <CardHeader>
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-64" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-24" />
                  </CardContent>
              </Card>
          </div>
      )
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">My Account</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Manage your personal information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={user.displayName || 'John Doe'} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={user.email || 'user@example.com'} disabled />
          </div>
           <Button>Save Changes</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
                Choose what you want to be notified about.
            </CardDescription>
        </Header>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="price-alerts" className="font-medium">Price Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified when your assets move significantly.</p>
                </div>
                <Switch id="price-alerts" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="weekly-summary" className="font-medium">Weekly Summary</Label>
                    <p className="text-sm text-muted-foreground">Receive a summary of your portfolio every week.</p>
                </div>
                <Switch id="weekly-summary" />
            </div>
            <Separator />
             <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="new-features" className="font-medium">New Features</Label>
                    <p className="text-sm text-muted-foreground">Get updates on new platform features and lessons.</p>
                </div>
                <Switch id="new-features" defaultChecked />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
