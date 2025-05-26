import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface OAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'github' | 'google'
  isLoading?: boolean
  icon: React.ReactNode
}

export function OAuthButton({
  provider,
  isLoading,
  icon,
  className,
  children,
  ...props
}: OAuthButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "w-full py-6 bg-slate-700/50 border border-slate-600 text-white",
        "hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white hover:border-transparent",
        "active:scale-[0.98] active:opacity-90",
        "disabled:opacity-100 disabled:cursor-pointer",
        "transition-all duration-200",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          <span>Connecting...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {icon}
          <span>{children}</span>
        </div>
      )}
    </Button>
  )
} 