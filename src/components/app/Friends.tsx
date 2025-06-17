import Card from "../shared/Card"

const Friends = () => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {
        Array(20).fill(0).map((index) => (
          <Card key={index}>
            <div className="flex flex-col items-center gap-3">
              <img 
                src="/images/girl.png"
                className="w-16 h-16 rounded-full object-cover"
              />
              <h1 className="text-base font-medium text-black">Fazila</h1>
              <button className=" mt-2 px-2 py-1 rounded text-xs bg-rose-400 hover:bg-rose-500 font-medium text-white">
                <i className="ri-user-minus-line mr-1"></i>
                Unfriend
              </button>
            </div>
          </Card>
        ))
      }
    </div>
  )
}

export default Friends