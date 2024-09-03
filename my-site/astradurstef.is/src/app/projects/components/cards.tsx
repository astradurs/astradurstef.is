import {
  Button,
  Card,
  Grid,
  Heading,
  Link,
  Separator,
  Text,
} from "@radix-ui/themes"

export function BaseCard({
  title,
  description,
  longDescription,
  href,
}: {
  title: string
  description: string
  longDescription?: string
  href: string
}) {
  return (
    <Card size="3">
      <Grid gap="4">
        <Grid>
          <Heading>{title}</Heading>
          <Text size="2" color="gray">
            {description}
          </Text>
        </Grid>
        {longDescription && <Text>{longDescription}</Text>}
        <Separator size="4" />
        <Button asChild>
          <Link href={href}>Open</Link>
        </Button>
      </Grid>
    </Card>
  )
}

export function GameCard({
  title,
  description,
  id,
  longDescription,
}: {
  title: string
  description: string
  id: string
  longDescription?: string
}) {
  return (
    <BaseCard
      title={title}
      description={description}
      longDescription={longDescription}
      href={`/projects/games/${id}`}
    />
  )
}

export function ToolCard({
  title,
  description,
  id,
  longDescription,
}: {
  title: string
  description: string
  id: string
  longDescription?: string
}) {
  return (
    <BaseCard
      title={title}
      description={description}
      longDescription={longDescription}
      href={`/projects/tools/${id}`}
    />
  )
}
