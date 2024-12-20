declare interface ModuleAnswer {
  id: number
  checklistAnswer: {
    id: number
    checklist_id: number
    truck_id: number
    user_id: number
  }
  relatedChecklist: Module
  relatedTruck: Truck
  relatedUser: User
}
