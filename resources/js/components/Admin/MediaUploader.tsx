import { useState } from 'react';

interface MediaFile {
    id?: number;
    path?: string;
    preview?: string;
    file?: File;
}

interface MediaUploaderProps {
    files: MediaFile[];
    onChange: (files: MediaFile[]) => void;
    maxFiles?: number;
    acceptedTypes?: string[];
    maxSizeMB?: number;
}

export function MediaUploader({
    files,
    onChange,
    maxFiles = 10,
    acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    maxSizeMB = 5,
}: MediaUploaderProps) {
    const [dragActive, setDragActive] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const validateFile = (file: File): string | null => {
        // Check file type
        if (!acceptedTypes.includes(file.type)) {
            return `Invalid file type. Accepted: ${acceptedTypes.join(', ')}`;
        }

        // Check file size
        const sizeMB = file.size / (1024 * 1024);
        if (sizeMB > maxSizeMB) {
            return `File too large. Max size: ${maxSizeMB}MB`;
        }

        return null;
    };

    const handleFiles = (fileList: FileList) => {
        const newFiles: MediaFile[] = [];
        const newErrors: string[] = [];

        Array.from(fileList).forEach((file) => {
            const error = validateFile(file);
            if (error) {
                newErrors.push(`${file.name}: ${error}`);
                return;
            }

            if (files.length + newFiles.length < maxFiles) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const newFile: MediaFile = {
                        file,
                        preview: reader.result as string,
                    };
                    newFiles.push(newFile);
                    if (newFiles.length === Math.min(fileList.length, maxFiles - files.length)) {
                        onChange([...files, ...newFiles]);
                    }
                };
                reader.readAsDataURL(file);
            }
        });

        setErrors(newErrors);
        setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    const handleRemove = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        onChange(newFiles);
    };

    return (
        <div className="space-y-4">
            {/* Upload Area */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative rounded-lg border-2 border-dashed p-8 text-center transition ${
                    dragActive
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
                }`}
            >
                <input
                    type="file"
                    multiple
                    accept={acceptedTypes.join(',')}
                    onChange={handleChange}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    disabled={files.length >= maxFiles}
                />
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                </svg>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {files.length < maxFiles ? (
                        <>
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </>
                    ) : (
                        <span className="font-semibold text-orange-600">Maximum files reached</span>
                    )}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                    {acceptedTypes.map((type) => type.split('/')[1].toUpperCase()).join(', ')} up to {maxSizeMB}MB
                    (max {maxFiles} files)
                </p>
            </div>

            {/* Errors */}
            {errors.length > 0 && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                    <ul className="list-inside list-disc space-y-1 text-sm text-red-800 dark:text-red-200">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Preview Grid */}
            {files.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {files.map((file, index) => (
                        <div key={index} className="group relative">
                            <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                                <img
                                    src={file.preview || (file.path ? `/storage/${file.path}` : '')}
                                    alt={`Preview ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <button
                                onClick={() => handleRemove(index)}
                                className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white opacity-0 transition hover:bg-red-700 group-hover:opacity-100"
                                type="button"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                {file.file?.name || file.path?.split('/').pop()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
