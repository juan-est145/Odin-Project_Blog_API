import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from "class-validator";

export function PasswordsMatches(
	property: string,
	validationOptions?: ValidationOptions,
) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: "passwordsMatches",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
					const [relatedPropertyName] = args.constraints;
					/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
					const relatedValue = (args?.object as any)[relatedPropertyName];
					return (
						typeof value === "string" &&
						typeof relatedValue === "string" &&
						value === relatedValue
					);
				},
				defaultMessage(): string {
					return "Passwords do not match";
				},
			},
		});
	};
}
