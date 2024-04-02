'use client'
const Index = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div
        onClick={() => {
          console.log('client')
        }}
      >
        client component
        {children}
      </div>
    </div>
  )
}

export default Index
