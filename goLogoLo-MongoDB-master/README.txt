# Remove a logo
mutation 
{
    removeLogo (id: "INSERT ID HERE")
    {
        _id
        text
        color
        fontSize
        lastUpdate
        backgroundColor
        borderWidth
        borderColor
        borderRadius
        padding
        margin
	height
	width
	ImageURLList
    }
}

# Get a single logo associated with ID and display all logo properties
{
    logo(id: "INSERT ID HERE") 
    {
        _id
        text
        color
        fontSize
        lastUpdate
        backgroundColor
        borderWidth
        borderColor
        borderRadius
        padding
        margin
	height
	width
	imageURLList
    }
}

# Get all logos (logos will be displayed in an array)
{
     logos
    {
        _id
        text
        color
        fontSize
        lastUpdate
        backgroundColor
        borderWidth
        borderColor
        borderRadius
        padding
        margin
	height
	width
	imageURLList
    }
}

# Add a logo
mutation 
{
    addLogo (
        text: "INSERT TEXT HERE",
        color: "INSERT HEX COLOR CODE HERE",
        fontSize: INSERT NUMBER HERE,
        backgroundColor: "INSERT HEX COLOR CODE HERE",
        borderWidth: INSERT NUMBER HERE,
        borderColor: "INSERT HEX COLOR CODE HERE",
        borderRadius: INSERT NUMBER HERE,
        padding: INSERT NUMBER HERE,
        margin: INSERT NUMBER HERE,
	height: INSERT NUMBER HERE,
	width: INSERT NUMBER HERE,
	imageURLList: INSERT NUMBER HERE,
        ) {
                _id
              text
              color
              fontSize
              lastUpdate
              backgroundColor
              borderWidth
              borderColor
              borderRadius
              padding
              margin
	      height
	      width
	      imageURLList
          }
}

# Update a logo
mutation 
{
    updateLogo (
        id: "INSERT ID HERE",
        text: "INSERT TEXT HERE",
        color: "INSERT HEX COLOR CODE HERE",
        fontSize: INSERT NUMBER HERE,
        backgroundColor: "INSERT HEX COLOR CODE HERE",
        borderWidth: INSERT NUMBER HERE,
        borderColor: "INSERT HEX COLOR CODE HERE",
        borderRadius: INSERT NUMBER HERE,
        padding: INSERT NUMBER HERE,
        margin: INSERT NUMBER HERE,
	height: INSERT NUMBER HERE,
	width: INSERT NUMBER HERE,
	imageURLList: INSERT NUMBER HERE,
  ) {
         _id
         text
         color
         fontSize
         lastUpdate
         backgroundColor
         borderWidth
         borderColor
         borderRadius
         padding
         margin 
	 height
	 width
	 imageURLList
    }
}
