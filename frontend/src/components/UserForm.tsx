import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, type UserFormValues } from "../validations/user.schema";

interface Props {
  defaultValues?: Partial<UserFormValues>;
  onSubmit: (data: UserFormValues) => void;
  isLoading?: boolean;
}

export default function UserForm({
  defaultValues,
  onSubmit,
  isLoading,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* First + Last */}
      <div className="grid md:grid-cols-2 gap-6">
        <Input label="First Name" error={errors.firstName?.message}>
          <input {...register("firstName")} className="input" />
        </Input>

        <Input label="Last Name" error={errors.lastName?.message}>
          <input {...register("lastName")} className="input" />
        </Input>
      </div>

      {/* Email + Mobile */}
      <div className="grid md:grid-cols-2 gap-6">
        <Input label="Email" error={errors.email?.message}>
          <input {...register("email")} className="input" />
        </Input>

        <Input label="Mobile" error={errors.mobile?.message}>
          <input {...register("mobile")} className="input" />
        </Input>
      </div>

      {/* Gender + Status */}
      <div className="grid md:grid-cols-2 gap-6">
        <Input label="Gender" error={errors.gender?.message}>
          <select {...register("gender")} className="input">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </Input>

        <Input label="Status" error={errors.status?.message}>
          <select {...register("status")} className="input">
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </Input>
      </div>

      {/* Location */}
      <Input label="Location" error={errors.location?.message}>
        <input {...register("location")} className="input" />
      </Input>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}

function Input({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium text-slate-700">{label}</label>
      {children}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
