// 'use client'

import { Container } from "../../../components/shared/container"
import { ChooseProductModal } from "@/components/shared/modals/choose-product-modal";
// import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase'
import { RegisterModal } from "@/components/shared/modals/register-modal";

export default async function RegisterModalPage({}) {

  return (
    <Container className="flex flex-col my-10">
      <RegisterModal />
    </Container>
  );
}
