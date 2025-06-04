import mongoengine as me

class Book(me.Document):
    title = me.StringField(required=True)
    author = me.StringField(required=True)
    published_date = me.DateTimeField()
    genre = me.StringField()
    available = me.BooleanField(default=True)


    def __str__(self):
        return self.title
