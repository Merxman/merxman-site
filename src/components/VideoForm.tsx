  <div className="bg-white rounded-lg shadow-lg p-8">
    <div className="flex items-center gap-3 mb-6">
      <Sparkles className="w-6 h-6 text-primary-600" />
      <h2 className="text-2xl font-bold text-gray-900">
        Create AI Video
      </h2>
    </div>

    {error && (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 text-sm">{error}</p>
      </div>
    )}

    <div className="space-y-6">
      {/* Customer Name */}
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          required
          value={formData.customerName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Your full name"
        />
      </div>

      {/* Customer Email */}
      <div>
        <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          required
          value={formData.customerEmail}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="your@email.com"
        />
      </div>

      {/* Product Name */}
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
          Product/Service Name *
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          required
          value={formData.productName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g. Merxman AI Video"
        />
      </div>

      {/* Target Audience */}
      <div>
        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
          Target Audience *
        </label>
        <input
          type="text"
          id="targetAudience"
          name="targetAudience"
          required
          value={formData.targetAudience}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g. B2B companies, young adults, tech startups"
        />
      </div>

      {/* Video Style */}
      <div>
        <label htmlFor="videoStyle" className="block text-sm font-medium text-gray-700 mb-2">
          Video Style *
        </label>
        <select
          id="videoStyle"
          name="videoStyle"
          required
          value={formData.videoStyle}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {VIDEO_STYLES.map(style => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
          Duration *
        </label>
        <select
          id="duration"
          name="duration"
          required
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {DURATIONS.map(duration => (
            <option key={duration.value} value={duration.value}>
              {duration.label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500">
          Maximum duration depends on your subscription
        </p>
      </div>

      {/* Key Message */}
      <div>
        <label htmlFor="keyMessage" className="block text-sm font-medium text-gray-700 mb-2">
          Key Message *
        </label>
        <textarea
          id="keyMessage"
          name="keyMessage"
          required
          rows={4}
          value={formData.keyMessage}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Describe what you want the video to convey..."
        />
      </div>

      {/* Call to Action */}
      <div>
        <label htmlFor="callToAction" className="block text-sm font-medium text-gray-700 mb-2">
          Call to Action (optional)
        </label>
        <input
          type="text"
          id="callToAction"
          name="callToAction"
          value={formData.callToAction}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g. Order now, Contact us, Learn more"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating video...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Create AI Video
          </>
        )}
      </button>
    </div>
  </div>
  <div className="bg-white rounded-lg shadow-lg p-8">
    <div className="flex items-center gap-3 mb-6">
      <Sparkles className="w-6 h-6 text-primary-600" />
      <h2 className="text-2xl font-bold text-gray-900">
        Create AI Video
      </h2>
    </div>

    {error && (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 text-sm">{error}</p>
      </div>
    )}

    <div className="space-y-6">
      {/* Customer Name */}
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          required
          value={formData.customerName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Your full name"
        />
      </div>

      {/* Customer Email */}
      <div>
        <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          required
          value={formData.customerEmail}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="your@email.com"
        />
      </div>

      {/* Product Name */}
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-2">
          Product/Service Name *
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          required
          value={formData.productName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g. Merxman AI Video"
        />
      </div>

      {/* Target Audience */}
      <div>
        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
          Target Audience *
        </label>
        <input
          type="text"
          id="targetAudience"
          name="targetAudience"
          required
          value={formData.targetAudience}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g. B2B companies, young adults, tech startups"
        />
      </div>

      {/* Video Style */}
      <div>
        <label htmlFor="videoStyle" className="block text-sm font-medium text-gray-700 mb-2">
          Video Style *
        </label>
        <select
          id="videoStyle"
          name="videoStyle"
          required
          value={formData.videoStyle}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {VIDEO_STYLES.map(style => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
          Duration *
        </label>
        <select
          id="duration"
          name="duration"
          required
          value={formData.duration}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {DURATIONS.map(duration => (
            <option key={duration.value} value={duration.value}>
              {duration.label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-gray-500">
          Maximum duration depends on your subscription
        </p>
      </div>

      {/* Key Message */}
      <div>
        <label htmlFor="keyMessage" className="block text-sm font-medium text-gray-700 mb-2">
          Key Message *
        </label>
        <textarea
          id="keyMessage"
          name="keyMessage"
          required
          rows={4}
          value={formData.keyMessage}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Describe what you want the video to convey..."
        />
      </div>

      {/* Call to Action */}
      <div>
        <label htmlFor="callToAction" className="block text-sm font-medium text-gray-700 mb-2">
          Call to Action (optional)
        </label>
        <input
          type="text"
          id="callToAction"
          name="callToAction"
          value={formData.callToAction}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g. Order now, Contact us, Learn more"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating video...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Create AI Video
          </>
        )}
      </button>
    </div>
  </div>
```
