export interface Author {
  name: string
  slug: string
  role: string
  bio: string
  photo: string
}

export const authors: Author[] = [
  {
    name: 'Mia Collins',
    slug: 'mia-collins',
    role: 'Workspace Designer',
    bio: 'A decade designing ergonomic workspaces for remote teams. She believes environment is the most underrated productivity tool.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&auto=format&q=80',
  },
  {
    name: 'James Park',
    slug: 'james-park',
    role: 'Tech Reviewer',
    bio: 'Tested hundreds of keyboards, monitors, and desk accessories. If it goes on a desk, he has a strong opinion about it.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format&q=80',
  },
  {
    name: 'Sara Osei',
    slug: 'sara-osei',
    role: 'Productivity Researcher',
    bio: 'Studies how physical and digital environments affect focus and output. Her writing bridges neuroscience and practical advice.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format&q=80',
  },
  {
    name: 'Tom Hadley',
    slug: 'tom-hadley',
    role: 'Ergonomics Specialist',
    bio: 'Certified ergonomist who left corporate consulting to write about desks, chairs, and the science of sitting — and standing.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format&q=80',
  },
]

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug)
}

export function getAuthorByName(name: string): Author | undefined {
  return authors.find((a) => a.name === name)
}
