'use client'

import { Container } from "@/components/shared/container"
import { LoginModal } from "@/components/shared/modals/login-modal";

export default function LoginModalPage() {
  return (
    <Container className="flex flex-col my-10">
      <LoginModal />
    </Container>
  );
}