import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileForm from "@/components/account/ProfileForm";

export default function AccountPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin tài khoản</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProfileForm />
      </CardContent>
    </Card>
  )
}
