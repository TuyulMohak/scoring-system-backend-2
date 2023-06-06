const divisions = [
	{
		data: {
		    name: "MMD",
		    subdivisions: {
		      createMany: {
		        data: [ { name:"UI/UX" }, { name: "Video Editing" }, { name: "3D" }]
		      },
		    },
		},
		include: {
		    subdivisions: true,
		}
	},
	{
		data: {
		    name: "Programming",
		    subdivisions: {
		      createMany: {
		        data: [ { name:"Web" }, { name: "Mobile" }, { name: "Machine Learning" }]
		      },
		    },
		},
		include: {
		    subdivisions: true,
		}
	},
	{
		data: {
		    name: "SKJ",
		    subdivisions: {
		      createMany: {
		        data: [ { name:"Sistem Komputer" }, { name: "Jaringan" }]
		      },
		    },
		},
		include: {
		    subdivisions: true,
		}
	}
]

export default divisions