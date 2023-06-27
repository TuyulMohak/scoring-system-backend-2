const events = {
  "data": {
    "name": "SeededEvent",
	"desc": "this is seed event",
	"startDate": "NOW",
	"rounds": {
      "create": [
        { 
          "name": "isAlive", 
          "type": "select",
          "sequence": 1, 
          "selectOptions":{ 
            "create": [
              { "name":"yes" }, 
              { "name":"no" }
            ]
           }
    		},
    		{ 
              "name": "age", 
              "type": "number",
              "sequence": 2
    		}
      ]
    }
  }
}

export default events