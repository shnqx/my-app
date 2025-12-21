import { IconUserFilled, IconShoppingBag, IconSearch } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <Button variant="ghost" size="icon-lg" className="rounded-full">
        <IconSearch />
      </Button>
      <Button variant="outline">
        <IconUserFilled /> Войти
      </Button>
      <Button >
        <IconShoppingBag />
      </Button>
    </>
  )
}
