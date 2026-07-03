<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronLeft, Plus, Send } from '@lucide/vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/forms/AppInput.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppPageHeader from '@/components/layout/AppPageHeader.vue'
import AppEmptyState from '@/components/empty-state/AppEmptyState.vue'
import { chatContacts, chatConversations } from '@/data/mock/chats.mock'

const route = useRoute()

const searchQuery = ref('')
const selectedContactId = ref<string | null>(null)
const messageInput = ref('')
const showNewChat = ref(false)
const newChatSearch = ref('')

const filteredContacts = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return chatContacts.filter((c) => c.name.toLowerCase().includes(q))
})

const filteredNewChatContacts = computed(() => {
  const q = newChatSearch.value.toLowerCase()
  if (!q) return chatContacts
  return chatContacts.filter((c) => c.name.toLowerCase().includes(q))
})

const selectedConversation = computed(() => {
  if (!selectedContactId.value) return null
  return chatConversations.find((c) => c.contact_id === selectedContactId.value) || null
})

const selectedContact = computed(() => {
  if (!selectedContactId.value) return null
  return chatContacts.find((c) => c.id === selectedContactId.value) || null
})

function selectContact(id: string) {
  selectedContactId.value = id
  const conv = chatConversations.find((c) => c.contact_id === id)
  if (conv) conv.unread_count = 0
}

function startNewChat(contactId: string) {
  let conv = chatConversations.find((c) => c.contact_id === contactId)
  if (!conv) {
    conv = {
      id: `conv-${Date.now()}`,
      contact_id: contactId,
      unread_count: 0,
      messages: [],
    }
    chatConversations.push(conv)
  }
  selectedContactId.value = contactId
  showNewChat.value = false
  newChatSearch.value = ''
}

function sendMessage() {
  if (!messageInput.value.trim() || !selectedConversation.value) return
  selectedConversation.value.messages.push({
    id: `msg-${Date.now()}`,
    conversation_id: selectedConversation.value.id,
    sender_id: 'me',
    text: messageInput.value.trim(),
    timestamp: new Date().toISOString(),
    is_read: true,
  })
  messageInput.value = ''
}

function formatTime(ts: string) {
  const date = new Date(ts)
  const now = new Date()
  const diffMin = Math.floor((now.getTime() - date.getTime()) / 60000)
  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffMin < 1440) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

function statusColor(status: string) {
  switch (status) {
    case 'online': return 'bg-success-500'
    case 'away': return 'bg-warning-500'
    case 'busy': return 'bg-danger-500'
    default: return 'bg-app-textMuted'
  }
}

function statusLabel(status: string) {
  switch (status) {
    case 'online': return 'Online'
    case 'away': return 'Away'
    case 'busy': return 'Busy'
    default: return 'Offline'
  }
}
</script>

<template>
  <div class="app-page">
    <AppPageHeader title="Chat" description="Real-time conversations with your team and contacts." :breadcrumb="route.meta.breadcrumb as string[]" />

    <div class="grid gap-0 overflow-hidden rounded-card border border-app-borderSoft bg-app-card shadow-card md:grid-cols-[20rem_minmax(0,1fr)]">
      <!-- Contact List -->
      <aside class="border-r border-app-borderSoft bg-app-muted md:block" :class="selectedContactId ? 'hidden' : 'block'">
        <div class="p-3">
          <AppButton class="w-full" @click="showNewChat = true">
            <Plus class="mr-1 h-4 w-4" aria-hidden="true" />
            New Chat
          </AppButton>
        </div>
        <div class="border-t border-app-borderSoft p-3">
          <AppInput id="chat-search" v-model="searchQuery" placeholder="Search contacts..." aria-label="Search contacts" />
        </div>

        <div v-if="filteredContacts.length === 0" class="flex items-center justify-center p-6">
          <AppEmptyState title="No contacts" description="Try a different search term." />
        </div>

        <div v-else class="divide-y divide-app-borderSoft overflow-y-auto" style="max-height: 32rem">
          <button
            v-for="contact in filteredContacts"
            :key="contact.id"
            class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-app-card"
            :class="{ 'bg-primary-50': selectedContactId === contact.id }"
            type="button"
            @click="selectContact(contact.id)"
          >
            <div class="relative shrink-0">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-100 text-sm font-semibold text-secondary-700">
                {{ contact.name.charAt(0) }}{{ contact.name.split(' ').pop()?.charAt(0) }}
              </div>
              <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white" :class="statusColor(contact.status)" />
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between">
                <span class="truncate text-sm font-medium text-app-text">{{ contact.name }}</span>
              </div>
              <p class="text-xs text-app-textMuted">{{ statusLabel(contact.status) }}</p>
            </div>
          </button>
        </div>
      </aside>

      <!-- Conversation Panel -->
      <div v-if="selectedContact" class="flex flex-col" :class="selectedContactId ? 'block' : 'hidden md:flex'">
        <!-- Header -->
        <div class="flex items-center gap-3 border-b border-app-borderSoft px-4 py-3">
          <button class="flex items-center gap-1 text-sm text-app-textMuted hover:text-app-text md:hidden" type="button" @click="selectedContactId = null">
            <ChevronLeft class="h-4 w-4" aria-hidden="true" />
            Back
          </button>
          <div class="flex items-center gap-3">
            <div class="relative shrink-0">
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-100 text-xs font-semibold text-secondary-700">
                {{ selectedContact.name.charAt(0) }}{{ selectedContact.name.split(' ').pop()?.charAt(0) }}
              </div>
              <span class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white" :class="statusColor(selectedContact.status)" />
            </div>
            <div>
              <p class="text-sm font-medium text-app-text">{{ selectedContact.name }}</p>
              <p class="text-xs text-app-textMuted">{{ statusLabel(selectedContact.status) }}</p>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div v-if="selectedConversation" class="flex-1 space-y-3 overflow-y-auto p-4" style="max-height: 24rem">
          <div
            v-for="msg in selectedConversation.messages"
            :key="msg.id"
            class="flex"
            :class="msg.sender_id === 'me' ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[75%] rounded-xl px-3 py-2 text-sm"
              :class="msg.sender_id === 'me' ? 'bg-primary-500 text-white' : 'bg-app-muted text-app-textSecondary'"
            >
              <p>{{ msg.text }}</p>
              <p class="mt-1 text-right text-xs" :class="msg.sender_id === 'me' ? 'text-primary-100' : 'text-app-textMuted'">
                {{ formatTime(msg.timestamp) }}
              </p>
            </div>
          </div>
        </div>

        <div v-else class="flex flex-1 items-center justify-center p-6">
          <AppEmptyState title="No conversation yet" description="Start chatting with this contact." />
        </div>

        <!-- Input -->
        <div class="border-t border-app-borderSoft p-3">
          <form class="flex gap-2" @submit.prevent="sendMessage">
            <AppInput id="chat-message" v-model="messageInput" placeholder="Type a message..." aria-label="Type a message" class="flex-1" />
            <button
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
              type="submit"
              :disabled="!messageInput.trim()"
              aria-label="Send message"
            >
              <Send class="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="hidden items-center justify-center p-6 md:flex">
        <AppEmptyState title="Select a contact" description="Choose a conversation from the left to start chatting." />
      </div>
    </div>

    <!-- New Chat Modal -->
    <AppModal :open="showNewChat" title="New Chat" @close="showNewChat = false; newChatSearch = ''">
      <div class="grid gap-3">
        <AppInput id="new-chat-search" v-model="newChatSearch" placeholder="Search contacts..." aria-label="Search contacts" />
        <div v-if="filteredNewChatContacts.length === 0" class="py-4 text-center text-sm text-app-textMuted">
          No contacts found.
        </div>
        <div v-else class="divide-y divide-app-borderSoft">
          <button
            v-for="contact in filteredNewChatContacts"
            :key="contact.id"
            class="flex w-full items-center gap-3 px-2 py-2.5 text-left transition-colors hover:bg-app-muted rounded-lg"
            type="button"
            @click="startNewChat(contact.id)"
          >
            <div class="relative shrink-0">
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-100 text-xs font-semibold text-secondary-700">
                {{ contact.name.charAt(0) }}{{ contact.name.split(' ').pop()?.charAt(0) }}
              </div>
              <span class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white" :class="statusColor(contact.status)" />
            </div>
            <div>
              <p class="text-sm font-medium text-app-text">{{ contact.name }}</p>
              <p class="text-xs text-app-textMuted">{{ statusLabel(contact.status) }}</p>
            </div>
          </button>
        </div>
      </div>
    </AppModal>
  </div>
</template>
