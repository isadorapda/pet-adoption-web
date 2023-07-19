export interface Options {
  label: string
  value: string
  field: string
  order: 'asc' | 'desc'
}

export const options: Options[] = [
  {
    label: 'Age (youngest - oldest)',
    value: 'ageAsc',
    field: 'age',
    order: 'asc',
  },
  {
    label: 'Age (oldest - youngest)',
    value: 'ageDesc',
    field: 'age',
    order: 'desc',
  },
  {
    label: 'Name (A - Z)',
    value: 'nameAsc',
    field: 'name',
    order: 'asc',
  },
  {
    label: 'Name (Z - A)',
    value: 'nameDesc',
    field: 'name',
    order: 'desc',
  },
]
