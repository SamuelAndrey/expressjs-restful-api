import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";

const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    })
}

const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    })
}

const removeAllTestContacts = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: "test"
        }
    })
}

const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
            username: "test",
            first_name: "test",
            last_name: "test",
            email: "test@localhost.com",
            phone: "111111"
        }
    })
}

const createManyTestContacts = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.contact.create({
            data: {
                username: `test`,
                first_name: `test ${i}`,
                last_name: `test ${i}`,
                email: `test${i}@localhost.com`,
                phone: `222${i}`
            }
        })
    }
}

const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: "test"
        }
    })
}

const removeAllTestAddresses = async () => {
    await prismaClient.address.deleteMany({
        where: {
            contact: {
                username: "test"
            }
        }
    })
}

const createTestAddress = async () => {
    const contact = await getTestContact();
    await prismaClient.address.create({
        data: {
            contact_id: contact.id,
            street: "jalan test",
            city: "kota test",
            province: "provinsi test",
            country: "negara test",
            postal_code: "12345",
        }
    })
}

const getTestAddress = async () => {
    return prismaClient.address.findFirst({
        where: {
            contact: {
                username: "test"
            }
        }
    })
}
export {
    removeTestUser,
    createTestUser,
    getTestUser,
    removeAllTestContacts,
    createTestContact,
    getTestContact,
    createManyTestContacts,
    removeAllTestAddresses,
    createTestAddress,
    getTestAddress,
}