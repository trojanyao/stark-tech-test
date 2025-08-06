import { Box } from '@mui/material'

export default function SectionTitle({ title }: { title: string }) {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        px: 3,
        py: 2,
        borderRadius: 1,
        color: 'white',
        fontWeight: 600
      }}
    >
      {title}
    </Box>
  )
}
