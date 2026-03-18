import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";
import { sendFormEmail } from "@/lib/mailtoSubmit";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

const industries = [
  "Manufacturing",
  "Distribution & Logistics",
  "Retail & E-commerce",
  "Professional Services",
  "Healthcare",
  "Real Estate",
  "Food & Beverage",
  "Technology",
  "Other",
];

const revenueRanges = ["₹5–10 Cr", "₹10–25 Cr", "₹25–50 Cr", "50+ Cr"];

export function StrategySessionApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    industry: "",
    revenueRange: "",
    numberOfEmployees: "",
    operationalBottleneck: "",
    currentSystems: "",
    email: "",
    mobile: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.revenueRange)
      newErrors.revenueRange = "Revenue range is required";
    if (!formData.numberOfEmployees.trim())
      newErrors.numberOfEmployees = "Number of employees is required";
    if (!formData.operationalBottleneck.trim())
      newErrors.operationalBottleneck =
        "Please describe your biggest operational bottleneck";
    if (!formData.email.trim()) newErrors.email = "Work email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitError("");
    const success = await sendFormEmail(
      `Strategy Session Application – ${formData.companyName}`,
      {
        name: `${formData.firstName} ${formData.lastName}`,
        company: formData.companyName,
        industry: formData.industry,
        revenue_range: formData.revenueRange,
        number_of_employees: formData.numberOfEmployees,
        email: formData.email,
        mobile: formData.mobile,
        current_systems: formData.currentSystems || "Not specified",
        operational_bottleneck: formData.operationalBottleneck,
      },
    );
    setIsSubmitting(false);
    if (success) {
      trackEvent("form_submit", { form_name: "Strategy Session" });
      setSubmitted(true);
    } else {
      setSubmitError(
        "Something went wrong. Please email us directly at contact@weareinovics.com",
      );
    }
  };

  if (submitted) {
    return (
      <div
        className="bg-background border border-border rounded-xl p-8 lg:p-10 text-center"
        data-ocid="strategy_form.success_state"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-yellow/10 mb-6">
          <CheckCircle2 className="h-8 w-8 text-accent-yellow" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-4">Thank You!</h3>
        <p className="text-lg text-white mb-4">
          Your enquiry has been received. We'll get back to you within 24–48
          hours.
        </p>
        <Button
          onClick={() => setSubmitted(false)}
          variant="outline"
          className="mt-6 border-accent-yellow text-accent-yellow hover:bg-accent-yellow/10"
        >
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background border border-border rounded-xl p-8 lg:p-10"
      data-ocid="strategy_form.panel"
    >
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="firstName" className="text-foreground mb-2 block">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className={errors.firstName ? "border-destructive" : ""}
            data-ocid="strategy_form.firstName.input"
          />
          {errors.firstName && (
            <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName" className="text-foreground mb-2 block">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className={errors.lastName ? "border-destructive" : ""}
            data-ocid="strategy_form.lastName.input"
          />
          {errors.lastName && (
            <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>
      <div className="mb-6">
        <Label htmlFor="companyName" className="text-foreground mb-2 block">
          Company Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
          className={errors.companyName ? "border-destructive" : ""}
          data-ocid="strategy_form.companyName.input"
        />
        {errors.companyName && (
          <p className="text-sm text-destructive mt-1">{errors.companyName}</p>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="industry" className="text-foreground mb-2 block">
            Industry <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.industry}
            onValueChange={(v) => setFormData({ ...formData, industry: v })}
          >
            <SelectTrigger
              id="industry"
              className={errors.industry ? "border-destructive" : ""}
              data-ocid="strategy_form.industry.select"
            >
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((i) => (
                <SelectItem key={i} value={i}>
                  {i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && (
            <p className="text-sm text-destructive mt-1">{errors.industry}</p>
          )}
        </div>
        <div>
          <Label htmlFor="revenueRange" className="text-foreground mb-2 block">
            Annual Revenue Range <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.revenueRange}
            onValueChange={(v) => setFormData({ ...formData, revenueRange: v })}
          >
            <SelectTrigger
              id="revenueRange"
              className={errors.revenueRange ? "border-destructive" : ""}
              data-ocid="strategy_form.revenueRange.select"
            >
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              {revenueRanges.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.revenueRange && (
            <p className="text-sm text-destructive mt-1">
              {errors.revenueRange}
            </p>
          )}
        </div>
      </div>
      <div className="mb-6">
        <Label
          htmlFor="numberOfEmployees"
          className="text-foreground mb-2 block"
        >
          Number of Employees <span className="text-destructive">*</span>
        </Label>
        <Input
          id="numberOfEmployees"
          value={formData.numberOfEmployees}
          onChange={(e) =>
            setFormData({ ...formData, numberOfEmployees: e.target.value })
          }
          className={errors.numberOfEmployees ? "border-destructive" : ""}
          placeholder="e.g., 25"
          data-ocid="strategy_form.employees.input"
        />
        {errors.numberOfEmployees && (
          <p className="text-sm text-destructive mt-1">
            {errors.numberOfEmployees}
          </p>
        )}
      </div>
      <div className="mb-6">
        <Label
          htmlFor="operationalBottleneck"
          className="text-foreground mb-2 block"
        >
          Biggest Operational Bottleneck{" "}
          <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="operationalBottleneck"
          value={formData.operationalBottleneck}
          onChange={(e) =>
            setFormData({ ...formData, operationalBottleneck: e.target.value })
          }
          className={errors.operationalBottleneck ? "border-destructive" : ""}
          rows={4}
          placeholder="Describe your biggest operational challenge..."
          data-ocid="strategy_form.bottleneck.textarea"
        />
        {errors.operationalBottleneck && (
          <p className="text-sm text-destructive mt-1">
            {errors.operationalBottleneck}
          </p>
        )}
      </div>
      <div className="mb-6">
        <Label htmlFor="currentSystems" className="text-foreground mb-2 block">
          Current Systems Used{" "}
          <span className="text-muted-foreground text-sm">(Optional)</span>
        </Label>
        <Input
          id="currentSystems"
          value={formData.currentSystems}
          onChange={(e) =>
            setFormData({ ...formData, currentSystems: e.target.value })
          }
          placeholder="e.g., Tally, Excel, Custom ERP"
          data-ocid="strategy_form.systems.input"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <Label htmlFor="email" className="text-foreground mb-2 block">
            Work Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={errors.email ? "border-destructive" : ""}
            data-ocid="strategy_form.email.input"
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="mobile" className="text-foreground mb-2 block">
            Mobile Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="mobile"
            type="tel"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
            className={errors.mobile ? "border-destructive" : ""}
            data-ocid="strategy_form.mobile.input"
          />
          {errors.mobile && (
            <p className="text-sm text-destructive mt-1">{errors.mobile}</p>
          )}
        </div>
      </div>
      {submitError && (
        <p
          className="text-sm text-destructive mb-4"
          data-ocid="strategy_form.error_state"
        >
          {submitError}
        </p>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent-yellow text-navy hover:bg-accent-yellow/90 font-semibold text-lg py-6"
        data-ocid="strategy_form.submit_button"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          "Submit Application"
        )}
      </Button>
      <p className="text-sm text-muted-foreground text-center mt-4">
        Applications are reviewed within 24–48 hours.
      </p>
    </form>
  );
}
