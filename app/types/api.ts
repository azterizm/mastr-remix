
export interface CreateInput extends Omit<DocumentInfo, 'color'> {
  testType: string
}

export type ChangeCreateInput = <T extends keyof CreateInput>(key: T, value: CreateInput[T]) => void

export interface AddManuallyInput { question: string, options: string[] }

export interface DocumentInfo {
  subject: string
  chapterNumber: number
  chapterName: string
  headline: string
  subTitle: string
  color: string
  date: Date
}


export type CreateDocumentBody ={
  info: CreateInput & { color?: string },
  content: AddManuallyInput[]
  thumbnailDataUri: string
  pdfDataUri: string
}

