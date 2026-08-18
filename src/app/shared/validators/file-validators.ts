import { AbstractControl, ValidationErrors } from "@angular/forms";


export function fileListValidator(maxFiles: number, maxSizeMb: number) {
    return (control: AbstractControl): ValidationErrors | null => {
        const files: File[] = control.value;

        if (!files || files.length === 0) {
            // return { required: true };
            return null;
        }

        if (files.length > maxFiles) {
            return { maxFiles: { actual: files.length, max: maxFiles } };
        }

        const maxSizeBytes = maxSizeMb * 1024 * 1024;
        const oversizedFiles = files.filter(file => file.size > maxSizeBytes);

        if (oversizedFiles.length > 0) {
            return {
                maxSize: {
                    max: maxSizeMb,
                    files: oversizedFiles.map(f => f.name)
                }
            };
        }

        return null;
    }
}