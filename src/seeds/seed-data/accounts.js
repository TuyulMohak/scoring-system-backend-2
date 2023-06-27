import bcrypt from 'bcrypt'

const hashedPassword = async (realPw) => await bcrypt.hash(realPw, 10)

const adminAccount = { username:"admin", name:'default', password: await hashedPassword("admin202313"), role:"ADMIN" }
const numberOfAccounts = 10
const neoterAccounts = []

for (let i=1; i<=numberOfAccounts; i++) {
	const newPw = "neoter" + i**2
	neoterAccounts.push({
		username:"neoter"+i,
		name:'default',
		password: await hashedPassword(String(newPw))
		// password: String(newPw)
	})
}

export { adminAccount, neoterAccounts }