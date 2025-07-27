import CaesarCipherInteractive from "@/components/crypto/caesar-cipher-interactive";

export default function CaesarPage() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Caesar Cipher
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
          A hands-on demonstration of one of the earliest known encryption techniques. Watch characters transform in real-time as you adjust the shift value.
        </p>
      </div>
      <CaesarCipherInteractive />
    </div>
  );
}
