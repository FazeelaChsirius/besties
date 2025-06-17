import Button from "../shared/Button"
import Card from "../shared/Card"
import Divider from "../shared/Divider"
import IconButton from "../shared/IconButton"

const Post = () => {
  return (
    <div className="space-y-8">
      {
        Array(20).fill(0).map((item, index) => (
          <Card 
            key={index}
          >
            <div className="space-y-3">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae aspernatur, veniam provident cum a quas rerum adipisci ducimus, nobis corporis labore, reiciendis nihil dicta obcaecati nisi exercitationem id nesciunt quaerat.
              </p>
              <div className="flex justify-between items-center">
                  <label className="text-sm font-normal">Jan 2, 2025 07:00PM</label>
                  <div className="flex gap-4">
                    <IconButton type="danger" icon="delete-bin-4-line"/>
                    <IconButton type="info" icon="edit-line"/>
                  </div>
                </div>
                <Divider />
                <div className="space-x-4">
                  <Button icon="thumb-up-line" type="info">20k</Button>
                  <Button icon="thumb-down-line" type="warning">20k</Button>
                  <Button icon="chat-ai-line" type="danger">20k</Button>
                </div>
              </div>
          </Card>
        ))
      }
    </div>
  )
}

export default Post