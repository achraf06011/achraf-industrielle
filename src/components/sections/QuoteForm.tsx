'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'
import { Send, CheckCircle2, RefreshCw, Shield, Clock, Lock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { staggerContainer, fadeInUp, viewportConfig } from '@/lib/animations'

type FormData = {
  fullName: string
  company: string
  phone: string
  email: string
  sector: string
  service: string
  description: string
}

function FormField({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-500 inline-block" />
          {error}
        </p>
      )}
    </div>
  )
}

export default function QuoteForm() {
  const t = useTranslations('quote')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const schema = useMemo(
    () =>
      z.object({
        fullName: z.string().min(2, t('err_fullName')),
        company: z.string().min(1, t('err_company')),
        phone: z.string().min(8, t('err_phone')),
        email: z.string().email(t('err_email')),
        sector: z.string().min(1, t('err_sector')),
        service: z.string().min(1, t('err_service')),
        description: z.string().min(20, t('err_description')),
      }),
    [t]
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: data.fullName,
            from_email: data.email,
            company: data.company,
            phone: data.phone,
            sector: data.sector,
            service: data.service,
            message: data.description,
            to_email: 'aaachchak@gmail.com',
          },
          publicKey
        )
      } else {
        // Demo mode: simulate success
        await new Promise((r) => setTimeout(r, 1500))
      }
      setIsSubmitted(true)
    } catch {
      toast.error(t('error_message'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    reset()
    setIsSubmitted(false)
  }

  const sectors = ['agro', 'textile', 'metallic', 'chemical', 'logistics', 'construction', 'other']
  const services = ['metallic', 'machining', 'maintenance', 'electrical', 'plastics', 'agro']

  const guarantees = [
    { icon: Clock, text: t('guarantee') },
    { icon: Shield, text: t('no_commitment') },
    { icon: Lock, text: t('confidential') },
  ]

  return (
    <section id="quote" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="text-center mb-14"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-4">{t('badge')}</Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-display font-bold text-3xl md:text-5xl text-gray-900 mb-4">
              {t('title')}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
              {t('subtitle')}
            </motion.p>

            {/* Guarantees */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6">
              {guarantees.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-gray-500 text-sm">
                  <Icon className="w-4 h-4 text-brand-blue" />
                  {text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="h-1 bg-gradient-to-r from-brand-blue via-brand-blue-bright to-brand-blue" />

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </motion.div>
                    <h3 className="font-display font-bold text-2xl text-gray-900 mb-3">
                      {t('success_title')}
                    </h3>
                    <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
                      {t('success_message')}
                    </p>
                    <Button variant="outline" onClick={handleReset}>
                      <RefreshCw className="w-4 h-4" />
                      {t('success_btn')}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label={t('fullName_label')} error={errors.fullName?.message}>
                        <Input
                          placeholder={t('fullName_placeholder')}
                          {...register('fullName')}
                          className={errors.fullName ? 'border-red-300 focus-visible:ring-red-400' : ''}
                        />
                      </FormField>

                      <FormField label={t('company_label')} error={errors.company?.message}>
                        <Input
                          placeholder={t('company_placeholder')}
                          {...register('company')}
                          className={errors.company ? 'border-red-300 focus-visible:ring-red-400' : ''}
                        />
                      </FormField>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label={t('phone_label')} error={errors.phone?.message}>
                        <Input
                          type="tel"
                          placeholder={t('phone_placeholder')}
                          {...register('phone')}
                          className={errors.phone ? 'border-red-300 focus-visible:ring-red-400' : ''}
                        />
                      </FormField>

                      <FormField label={t('email_label')} error={errors.email?.message}>
                        <Input
                          type="email"
                          placeholder={t('email_placeholder')}
                          {...register('email')}
                          className={errors.email ? 'border-red-300 focus-visible:ring-red-400' : ''}
                        />
                      </FormField>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField label={t('sector_label')} error={errors.sector?.message}>
                        <Select onValueChange={(v) => setValue('sector', v, { shouldValidate: true })}>
                          <SelectTrigger className={errors.sector ? 'border-red-300' : ''}>
                            <SelectValue placeholder={t('sector_placeholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            {sectors.map((s) => (
                              <SelectItem key={s} value={s}>
                                {t(`sector_${s}`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>

                      <FormField label={t('service_label')} error={errors.service?.message}>
                        <Select onValueChange={(v) => setValue('service', v, { shouldValidate: true })}>
                          <SelectTrigger className={errors.service ? 'border-red-300' : ''}>
                            <SelectValue placeholder={t('service_placeholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((s) => (
                              <SelectItem key={s} value={s}>
                                {t(`service_${s}`)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormField>
                    </div>

                    {/* Description */}
                    <FormField label={t('description_label')} error={errors.description?.message}>
                      <Textarea
                        placeholder={t('description_placeholder')}
                        rows={5}
                        {...register('description')}
                        className={errors.description ? 'border-red-300 focus-visible:ring-red-400' : ''}
                      />
                    </FormField>

                    {/* Submit */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="premium"
                        size="xl"
                        disabled={isLoading}
                        className="w-full md:w-auto"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            {t('submitting')}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {t('submit')}
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
