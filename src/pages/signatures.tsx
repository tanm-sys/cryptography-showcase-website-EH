import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from "lucide-react";

export default function SignaturesPage() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Digital Signatures
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
          Learn how digital signatures ensure data integrity and authenticity. More interactive demos coming soon!
        </p>
      </div>
      <Card className="max-w-md mx-auto glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-6 w-6 text-primary" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Interactive digital signature creation and verification demos are under construction. Check back later!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
