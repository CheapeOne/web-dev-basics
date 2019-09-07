
class CirclesDB:
    circles_dict = {}
    last_id = 0

    # Get all circles
    def all(self):
        return self.circles_dict.values()

    # Add a circle to the DB
    def add(self, circle_data):
        next_id = self.last_id + 1
        circle_data['id'] = next_id
        self.circles_dict[next_id] = circle_data
        self.last_id = next_id
        return circle_data

    # Remove a specific circle from the DB
    def remove(self, id):
        try:
            del self.circles_dict[id]
            return True
        except KeyError:
            print('Circle with ID %s not found!' % (id))
            return False
