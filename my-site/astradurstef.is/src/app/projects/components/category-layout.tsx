import { Grid, Heading, Text } from "@radix-ui/themes"

export default function CategoryLayout({
  title,
  description,
  cards,
}: {
  title: string
  description?: string
  cards: React.ReactNode[]
}) {
  return (
    <Grid gap="4">
      <Grid>
        <Heading as="h2">{title}</Heading>
        {description && (
          <Text color="gray" size="2">
            {description}
          </Text>
        )}
      </Grid>
      <Grid columns="3">{cards}</Grid>
    </Grid>
  )
}
