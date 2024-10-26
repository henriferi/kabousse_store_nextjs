interface User {
    name: string;
    age?: number;
    city?: string;
}

export function greetUser (user: User): string {
    let greeting = `Hello, ${user.name}`

    if(user.age) {
        greeting += ` ${user.age} years old`;
    }

    if(user.city) {
        greeting += ` from ${user.city}`;
    }

    return greeting;
}